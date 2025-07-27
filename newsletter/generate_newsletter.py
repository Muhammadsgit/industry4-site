import os
from transformers import pipeline
import datetime

# Ensure the output directory exists
os.makedirs('output', exist_ok=True)

# Set up the text generation pipeline with distilgpt2
generator = pipeline("text-generation", model="distilgpt2")

today = datetime.date.today()
prompt = (
    f"Industry 4.0 Weekly Newsletter - {today.strftime('%B %d, %Y')}\n"
    "Please generate 5 unique headlines about Industry 4.0, followed by a short summary paragraph (max 100 words) about the latest trends in Industry 4.0 this week.\n"
    "Headlines:\n- "
)

# Generate the newsletter
result = generator(
    prompt,
    max_length=300,  # Shorter for concise output
    num_return_sequences=1,
    temperature=0.9,
    top_p=0.95,
    do_sample=True
)

newsletter_text = result[0]['generated_text']

# Normalize all lines for comparison
def normalize(line):
    return line.replace('\xa0', ' ').replace('\u00a0', ' ').replace(chr(160), ' ').strip()

lines = [normalize(line) for line in newsletter_text.split('\n') if normalize(line)]

# Remove prompt lines from the output
prompt_lines = [
    f"Industry 4.0 Weekly Newsletter - {today.strftime('%B %d, %Y')}",
    "Please generate 5 unique headlines about Industry 4.0, followed by a short summary paragraph (max 100 words) about the latest trends in Industry 4.0 this week.",
    "Headlines:",
    "-"
]
lines = [line for line in lines if line not in prompt_lines and not line.startswith("Headlines:") and not line.strip() == "-"]

headlines = []
for line in lines:
    if line.startswith('- '):
        headlines.append(line[2:])
    elif len(headlines) < 5:
        headlines.append(line)
    if len(headlines) == 5:
        break

# The rest is the summary
if headlines:
    try:
        summary_start = lines.index(headlines[-1]) + 1
    except ValueError:
        summary_start = 5
else:
    summary_start = 0
summary = ' '.join(lines[summary_start:]) if summary_start < len(lines) else ''

html_content = f"""
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Industry 4.0 Weekly Newsletter - {today.strftime('%B %d, %Y')}</title>
    <style>
        body {{ font-family: Arial, sans-serif; background: #f7f7f7; margin: 0; padding: 0; font-size: 15px; }}
        .container {{ max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px; }}
        h1 {{ color: #2a5298; }}
        ul {{ padding-left: 20px; }}
        li {{ margin-bottom: 12px; line-height: 1.6; font-size: 15px; }}
        p {{ color: #333; font-size: 15px; }}
        .footer {{ margin-top: 32px; font-size: 0.9em; color: #888; text-align: center; }}
    </style>
</head>
<body>
    <div class='container'>
        <h1>Industry 4.0 Weekly Newsletter</h1>
        <h3>{today.strftime('%B %d, %Y')}</h3>
        <ul>
            {''.join([f'<li>{headline}</li>' for headline in headlines])}
        </ul>
        <p>{summary}</p>
        <div class='footer'>
            &copy; {today.year} Industry 4.0 Newsletter. Generated with Hugging Face DistilGPT-2.
        </div>
    </div>
</body>
</html>
"""

# Save to HTML file
html_filename = f"output/newsletter_{today.strftime('%Y_%m_%d')}.html"
with open(html_filename, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Newsletter saved as {html_filename}") 