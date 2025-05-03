from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from schemas import ClassifyResponse
from services import IAService, ImageService


api = FastAPI(
    title="FeelingAI API",
    description="A simple API for classifying felling in image using a pre-trained model.",
    version="0.0.1",
    summary="A simple API for classifying felling in image using a pre-trained model."
)

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get("/")
async def root():
    """
    # Root endpoint that returns a welcome message.
    
    ## Returns:
        - dict: A dictionary containing a welcome message.
    """
    return {"detail": "Welcome to FeelingAI API!"}


@api.post("/feeling")
async def classify_image(image: UploadFile) -> ClassifyResponse:
    """
    # Endpoint to classify feeling at an image using a pre-trained model.
    
    ## Args:
        - image (UploadFile): The uploaded image file.
    
    ## Returns:
        - ClassifyResponse: A Json containing the classification result. Example: {"result": "Triste"}
    """
    # Save the image to a temporary location
    image_path = ImageService.save_image(image, "temp.jpg")
    
    service = IAService()
    
    # Classify the image using the IAService
    result = service.feeling(image_path)
    
    return ClassifyResponse(result=result)