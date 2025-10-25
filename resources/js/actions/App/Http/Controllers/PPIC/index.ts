import ProductionPlanController from './ProductionPlanController'
import ProductionPlanReportController from './ProductionPlanReportController'
const PPIC = {
    ProductionPlanController: Object.assign(ProductionPlanController, ProductionPlanController),
ProductionPlanReportController: Object.assign(ProductionPlanReportController, ProductionPlanReportController),
}

export default PPIC