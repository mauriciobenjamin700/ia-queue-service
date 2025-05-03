import base64

from groq import Groq

from core import GROQ_API_KEY

class IAService:
    """
    A service class for image feeling classification using a pre-trained model.
    
    Methods:
        feeling(image_path: str) -> str:
            Get feeling an image using the pre-trained model.
        
        __map_image_path_to_base64(image_path: str) -> str:
            Map the image path to base64 format.
    """
    def __init__(self):
        self.client = client = Groq(api_key=GROQ_API_KEY)
        
        
    def feeling(self, image_path: str) -> str:
        """
        Get feeling an image using the pre-trained model.

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
                            "text": "Classifique em [Triste, Feliz, Neutro] a imagem abaixo. ex: 'Triste', 'Feliz', 'Neutro', 'Triste'.",
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