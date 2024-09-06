from pydantic import BaseModel
import joblib
import sys

# Muat model dan vectorizer yang sudah dilatih
model_filename = './Scoring/xgb_model_tfidf_best.joblib'
vectorizer_filename = './Scoring/vectorizer_tfidf.joblib'

# Load model dan vectorizer
model = joblib.load(model_filename)
vectorizer = joblib.load(vectorizer_filename)

# Definisikan schema input untuk API
class EssayInput(BaseModel):
    essay: str

# Get essay input from command line argument
essay_input = EssayInput(essay=sys.argv[1])

# Preprocess esai menggunakan vectorizer yang sudah dilatih
essay_vectorized = vectorizer.transform([essay_input.essay])
 
# Prediksi skor esai menggunakan model XGBoost
predicted_grade = model.predict(essay_vectorized)

# Write hasil prediksi to a text file
with open('prediction_output.txt', 'w') as f:
    f.write(f"{float(predicted_grade[0])} " )
