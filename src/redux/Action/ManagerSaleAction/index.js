import { managerSaleService } from "../../../services/manaderSale"

export const searchSaleStartDateAndEndDateAction = () => {
    return async dispatch => {
        try {
            const result = await managerSaleService.searchSaleStartDateAndEndDate()

        } catch (error) {
            console.log(error)
        }
    }
}
