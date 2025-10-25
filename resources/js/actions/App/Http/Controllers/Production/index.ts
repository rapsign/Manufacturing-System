import ProductionOrderController from './ProductionOrderController'
import ProductionReportController from './ProductionReportController'
const Production = {
    ProductionOrderController: Object.assign(ProductionOrderController, ProductionOrderController),
ProductionReportController: Object.assign(ProductionReportController, ProductionReportController),
}

export default Production