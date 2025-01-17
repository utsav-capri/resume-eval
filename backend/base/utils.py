from functools import cache
import json
import re
import requests
import random

@cache
def get_repo_description(repo_url):
    def get_raw_url():
        pattern = r'//([^/]+)'
        result = re.sub(pattern, '//raw.githubusercontent.com', repo_url)
        return f"{result.strip('/')}/main/README.md"
    raw_url = get_raw_url()
    response = requests.get(raw_url)
    if response.status_code == 200:
        return response.content.decode('utf-8')
    raise Exception("couldn't get data from URL")

def convert_docs_link_to_direct_download(docs_link,format="txt"):
        # Extract the file ID from the given Google Docs link
        match = re.search(r"/d/([^/]+)/", docs_link)
        if match:
            file_id = match.group(1)
            # Construct the direct download link in text format
            direct_download_link = f"https://docs.google.com/document/d/{file_id}/export?format={format}"
            return direct_download_link
        else:
            return None

@cache
def get_resume_from_url(url):
    
    direct_download_url=convert_docs_link_to_direct_download(url)
    response = requests.get(direct_download_url)
    return response.content.decode('utf-8').replace("\ufeff","").replace("\r","")

def extract_github_urls(text):
    # Define a regular expression to match GitHub URLs
    github_url_pattern = r'https?://github\.com/[\w\-]+/[\w\-]+'

    # Use re.findall to find all matches in the input text
    github_urls = re.findall(github_url_pattern, text)

    return github_urls
def check_for_inclusion_from_resume(interview_minute,resume_info):
    work_experience = " ".join(resume_info["work experience"]) if resume_info["work experience"] else ""
    complete_experience = set([word.lower() for word in work_experience.split(" ") if len(word)>0])
    interview_words = set([word.lower() for word in interview_minute.split(" ") if len(word)>0])
    return len(complete_experience.intersection(interview_words)) > 0

def get_filedata_of_repo(repo_url):
    file_link = get_random_files_from_repo(repo_url)
    res = requests.get(file_link)
    return res.text

def list_files_recursive(api_url):
    files = []
    response = requests.get(api_url)

    if response.status_code == 200:
        content = response.json()
        for item in content:
            if item['type'] == 'file':
                files.append(item['download_url'])
            elif item['type'] == 'dir':
                files.extend(list_files_recursive(item['url']))
    else:
        print(response.json())
    return files

def get_random_file(api_url):
    files = []
    response = requests.get(api_url)

    if response.status_code == 200:
        content = response.json()
        for item in content:
            if item['type'] == 'file':
                if item['download_url'].split('.')[-1] in ['py','js','jsx','cpp']:
                    files.append(item['download_url'])
            elif item['type'] == 'dir':
                files.extend(list_files_recursive(item['url']))
    else:
      print(response.json())

    return random.choice(files)

#NOTE using static because github api is crap
def get_random_files_from_repo(repo_url):
    if "notes" in repo_url:
        return "https://raw.githubusercontent.com/pSN0W/notes-generator/main/backend/convertorFunction/main.cpp"
    elif "warehouse" in repo_url:
        return "https://raw.githubusercontent.com/pSN0W/warehouse-optimisation/main/Warehouse/src/warehouse.py"
    elif "JApi" in repo_url:
        return "https://raw.githubusercontent.com/pSN0W/JApi/main/convert.py"
    else:
        return get_random_file(repo_url)

@cache
def extract_info_from_resume(resume_url):
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmNmY2RhMGUtYTVhYi00ZTQ5LWIzODktZjllZjI0ZjMxYjZkIiwidHlwZSI6ImFwaV90b2tlbiJ9.XUkst5DuqGUeIatXhgnxs9X757ihGoMkSoLQ7SffLT4"}

    url="https://api.edenai.run/v2/ocr/resume_parser"
    json_payload={
        "show_original_response": False,
        "fallback_providers": "",
        "providers": "affinda", 
        "file_url": convert_docs_link_to_direct_download(resume_url, format="pdf")
        }

    response = requests.post(url, json=json_payload, headers=headers)

    result = json.loads(response.text)
    result = result["affinda"]["extracted_data"]
    
    required_data = {}
    first_name = result['personal_infos']['name']['first_name']
    last_name = result['personal_infos']['name']['last_name']
    required_data["name"] = f"{first_name} {last_name}"
    
    github_profile = None
    for url in result['personal_infos']['urls']:
        if 'github.com' in url:
            github_profile = url
            break
    required_data["github"] = github_profile
    
    work_experience = []
    for entry in result['work_experience']['entries']:
        job_title = entry['title']
        company = entry['company']
        work_experience.append(company)
    required_data["work experience"] = work_experience
    
    required_data["skills"] = [skill['name'] for skill in result['skills']]
    
    required_data["email"] = result["personal_infos"]["mails"][0]
    
    return required_data