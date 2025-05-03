import base64

from groq import Groq

from core import GROQ_API_KEY

class IAService:
    """
    A service class for image classification using a pre-trained model.
    
    Methods:
        classify(image_path: str) -> str:
            Classify an image using the pre-trained model.
        
        __map_image_path_to_base64(image_path: str) -> str:
            Map the image path to base64 format.
    """
    def __init__(self):
        self.client = client = Groq(api_key=GROQ_API_KEY)
        
        
    def classify(self, image_path: str) -> str:
        """
        Classify an image using the pre-trained model.

        Args:
            image_path (str): The path to the image file.

        Returns:
            dict: The classification result.
        """
        data = self.__map_image_path_to_base64(image_path)
        
        chat = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Classifique em poucas palavras a imagem abaixo. ex: 'Um gato', 'Um carro', 'Logo do coríntias', 'Logo do flamengo'.",
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{data}"
                            },
                        },
                    ],
                }
                
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct"
        )
        return chat.choices[0].message.content
    
    
    @staticmethod
    def __map_image_path_to_base64(image_path: str):
        """
        Map the image path to base64 format.

        Args:
            image_path (str): The path to the image file.

        Returns:
            str: The base64 encoded string of the image.
        """
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')