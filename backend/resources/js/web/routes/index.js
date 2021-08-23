import { Switch, Route } from "react-router-dom";
import homeRouters from './homeRouters';
import authRouters from './authRouters';

const setRoute = (routes) => {
    var result = null;

    if(routes.length > 0){
        result = routes.map((route,index)=>{
            return(
                <Route key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}>

                </Route>
            )
        });
    }
    return <Switch>{result}</Switch>
}

const routes = [
    ...authRouters,
    ...homeRouters,
];

export default setRoute(routes)