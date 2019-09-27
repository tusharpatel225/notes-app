import {combineReducers} from 'redux'
import auth from './auth'
import notes from './notes'
import bioData from './bioData'
import isLoading from './loader'
export default combineReducers({auth, notes, bioData, isLoading});
