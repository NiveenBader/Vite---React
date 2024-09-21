import { useNavigate } from "react-router-dom";

function useTools() {
  const navigate = useNavigate();
  const handleClicked = (id) => {
    navigate(`/ReferredCard/${id}`);
    return id;
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return { handleClicked, handleEdit };
}
export default useTools;
