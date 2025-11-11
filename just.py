import json

# читаем JSON из файла
with open("dict.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# обрезаем все массивы translates
for item in data:
    if len(item["translates"]) > 2:
        item["translates"] = item["translates"][:2]

# сохраняем обратно
with open("dicti.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
