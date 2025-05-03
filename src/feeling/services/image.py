from fastapi import UploadFile


class ImageService:
    """
    A service class for handling image-related operations.
    """

    @staticmethod
    def save_image(image: UploadFile, path: str) -> str:
        """
        Save an uploaded image to a specified path.

        Args:
            image (UploadFile): The uploaded image file.
            path (str): The path where the image will be saved.

        Returns:
            str: The path where the image is saved.
        """
        with open(path, "wb") as buffer:
            buffer.write(image.file.read())
        return path