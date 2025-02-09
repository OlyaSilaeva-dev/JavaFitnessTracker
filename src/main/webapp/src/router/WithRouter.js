import { useParams } from "react-router-dom";

export function withRouter(Component) {
    return function WrapperComponent(props) {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}
