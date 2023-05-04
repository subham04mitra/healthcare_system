import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.preprocessing import LabelEncoder
import pickle
import sys
import json
S=sys.argv[1]



with open('model.pkl', 'rb') as m1:
        model = pickle.load(m1)





data = pd.read_csv(r'D:\New folder\Newfolder(4)\New _folder\Training.csv').dropna(axis = 1)
encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])
X = data.iloc[:,:-1]
symptoms = X.columns.values

# Creating a symptom index dictionary to encode the
# input symptoms into numerical form
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index

data_dict = {
    "symptom_index":symptom_index,
    "predictions_classes":encoder.classes_
}


# Defining the Function
# Input: string containing symptoms separated by commmas
# Output: Generated predictions by models
def predictDisease(symptoms):
    symptoms = symptoms.split(",")
    # creating input data for the models
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_data[index] = 1
        
    # reshaping the input data and converting it
    # into suitable format for model predictions
    input_data = np.array(input_data).reshape(1,-1)
    # generating individual outputs
    rf_prediction = data_dict["predictions_classes"][model.predict(input_data)[0]]

    # making final prediction by taking mode of all predictions
    predictions={ 
        "data": rf_prediction
       
    }
    result=json.dumps(predictions)
    return result

# Testing the function
# print(predictDisease("Itching,Skin Rash,Nodal Skin Eruptions"))
# print(predictDisease("Vomiting,Chills,High Fever,Headache,Constipation"))
print(predictDisease(S))