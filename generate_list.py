import os
import json

# 설정
ASSETS_DIR = 'assets'  # 에셋이 들어있는 폴더 이름
OUTPUT_FILE = 'fileList.js' # 결과가 저장될 파일 이름

def generate_file_list():
    # 1. assets 폴더 내의 파일 목록 읽기 (이미지 파일만 필터링)
    valid_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.webp')
    
    try:
        files = [f for f in os.listdir(ASSETS_DIR) 
                 if f.lower().endswith(valid_extensions)]
        
        # 2. 알파벳 순으로 정렬
        files.sort()

        # 3. JS 변수 형식으로 저장
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write("// 이 파일은 파이썬 스크립트에 의해 자동으로 생성되었습니다.\n")
            f.write("const fileList = ")
            f.write(json.dumps(files, indent=4))
            f.write(";")
            
        print(f"✅ 성공! {len(files)}개의 에셋을 {OUTPUT_FILE}에 저장했습니다.")
        
    except FileNotFoundError:
        print(f"❌ 에러: '{ASSETS_DIR}' 폴더를 찾을 수 없습니다.")

if __name__ == "__main__":
    generate_file_list()