import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import photosReducer from './reducers/photos'
import notificationsReducer from './reducers/notifications'
import pagesReducer from './reducers/pages'
import LogRocket from 'logrocket';


const reducer = combineReducers({
    photos: photosReducer,
    notifications: notificationsReducer,
    pages: pagesReducer,
})

const store = createStore(
    reducer,
    
    composeWithDevTools(
        applyMiddleware(
            thunk        )
    )
)

export default store