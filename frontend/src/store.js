import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import photosReducer from './reducers/photos'
import notificationsReducer from './reducers/notifications'
import LogRocket from 'logrocket';


const reducer = combineReducers({
    photos: photosReducer,
    notifications: notificationsReducer
})

const store = createStore(
    reducer,
    
    composeWithDevTools(
        applyMiddleware(
            thunk,
            LogRocket.reduxMiddleware(),
        )
    )
)

export default store