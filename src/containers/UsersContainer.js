import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Users from "../components/Users";
import { getUsers } from "../modules/users";

const UsersContainer = () => {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    // 컴포넌트가 마운트되고 나서 호출
    useEffect(() => {
        if (users) return; // users가 이미 유효하다면 요청하지 않음
        dispatch(getUsers());
    }, [dispatch, users]);

    return <Users users={users} />;
};

export default UsersContainer;