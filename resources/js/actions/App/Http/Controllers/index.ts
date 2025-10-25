import AuthController from './AuthController'
import DashboardController from './DashboardController'
import Manager from './Manager'
import PPIC from './PPIC'
import Production from './Production'
const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
DashboardController: Object.assign(DashboardController, DashboardController),
Manager: Object.assign(Manager, Manager),
PPIC: Object.assign(PPIC, PPIC),
Production: Object.assign(Production, Production),
}

export default Controllers