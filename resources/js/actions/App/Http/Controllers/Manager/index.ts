import ProductController from './ProductController'
import ProductionPlanController from './ProductionPlanController'
import WarehouseController from './WarehouseController'
const Manager = {
    ProductController: Object.assign(ProductController, ProductController),
ProductionPlanController: Object.assign(ProductionPlanController, ProductionPlanController),
WarehouseController: Object.assign(WarehouseController, WarehouseController),
}

export default Manager