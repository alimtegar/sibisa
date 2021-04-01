import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Components
import Home from './components/Home';
import Characters from './components/Characters';
import Character from './components/Character';
import Stages from './components/Stages';
import AttemptedQuestion from './components/AttemptedQuestion';
import AttemptedStage from './components/AttemptedStage';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Activate from './components/Activate';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col w-screen min-h-screen overflow-hidden">
                <Switch>
                    {/* Home Page */}
                    <Route
                        exact
                        path="/"
                        render={() => (<Home />)}
                    />
                    {/* Characters Page */}
                    <Route
                        exact
                        path="/characters/category/:category/:character"
                        render={(props: any) => (<Character {...props} />)}
                    />
                    <Route
                        exact
                        path="/characters/category/:category"
                        render={(props: any) => (<Characters {...props} />)}
                    />
                    {/* Stages Page */}
                    <Route
                        exact
                        path="/stages/category/:category"
                        render={(props: any) => (<Stages {...props} />)}
                    />
                    {/* Attempted Question Page */}
                    <Route
                        exact
                        path="/attempted-stages/:attemptedStageId/attempted-questions/n/:n"
                        render={(props: any) => (<AttemptedQuestion {...props} />)}
                    />
                    {/* Attempted Stage Page */}
                    <Route
                        exact
                        path="/attempted-stages/:id"
                        render={(props: any) => (<AttemptedStage {...props} />)}
                    />
                    {/* 404 */}
                    <Route
                        exact
                        path="/404"
                        render={() => (<NotFound />)}
                    />
                    {/* Register */}
                    <Route
                        exact
                        path="/register"
                        render={() => (<Register />)}
                    />
                    {/* Register */}
                    <Route
                        exact
                        path="/login"
                        render={() => (<Login />)}
                    />
                    {/* Activate */}
                    <Route
                        exact
                        path="/activate/:token"
                        render={(props: any) => (<Activate {...props} />)}
                    />
                </Switch>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
