import { useParams } from "react-router-dom"
import UserContainer from "../containers/UserContainer";

const UserPage = () => {
    const { id } = useParams();
    // useParams Hook을 통해 URL 파라미터를 조회, id 파라미터를 UserContainer에게 props로 넣어줌
    return <UserContainer id={id} />;
};

export default UserPage;