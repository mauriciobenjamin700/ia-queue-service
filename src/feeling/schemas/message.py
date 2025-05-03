from pydantic import BaseModel, Field


class ClassifyResponse(BaseModel):
    """
    Response model for classify endpoint.
    
    Attributes:
        result (str): The classification result.
    """

    result: str = Field(
        title="Classification Result",
        description="The classification result returned by the IAService.",
        examples=["A cat", "A dog", "A car"],
    )