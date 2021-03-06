class DashboardController < ApplicationController
    include CurrentUserConcern
    def index
        if @current_user
            sales = Sale.where(user_id: @current_user)
            
            render json: {
                sales: sales,
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end


        
    end

    # def show
    #     sale = Sale.find(params[:id])
    #     render json: {sale: sale}
    # end

    def create
        sale = Sale.create!(sale_params)
        render json: { sale: sale }
    end

    def update
        sale = Sale.find(params[:id])
       sale.update(sale_params)
       sale.save
        render json: { sale: sale }
        
    end

    def destroy
        if @current_user
        sale = Sale.find(params[:id])
        sale.destroy
        render json: {message: "Succesfully deleted"}
        end
        render json: {
            message: "Unable to delete"
        }
   
    end

    private
    def sale_params
        params.require(:sale).permit(:user_id, :address, :city, :state, :description, :zip, :date, :start_time, :end_time, :payment_type, :lat, :lng)
    end

 
    

end
