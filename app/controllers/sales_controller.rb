class SalesController < ApplicationController
    def index
        sales = Sale.all
        render json: {sales: sales}
    end

    def show
        sale = Sale.find(params[:id])
        render json: {sale: sale}
    end

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
        sale = Sale.find(params[:id])
        sale.destroy
        render json: {message: "Succesfully deleted"}
    end

    private
    def sale_params
        params.require(:sale).permit(:user_id, :address, :city, :state, :description, :zip, :date, :start_time, :end_time, :payment_type, :lat, :lng)
    end

 
    

end
