import axios from "axios";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const DeleteInput = () => {
  const handleKeyPress = (e: any) => {
    if (e.key !== "Enter") {
      return
    }

    const id = e.target.value;

    axios.delete(`/api/delete_fish?id=${id}`).catch((err) => console.log(err)).then((_res) => window.location.reload())
  }

  return (
    <Box>
      <Input onKeyPress={handleKeyPress} type="number" placeholder="Enter a fish id to delete"></Input>
    </Box>
  );
};
export default DeleteInput;
