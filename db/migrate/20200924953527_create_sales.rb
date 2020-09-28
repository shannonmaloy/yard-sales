class CreateSales < ActiveRecord::Migration[6.0]
  def change
    create_table :sales do |t|
      t.string :address
        t.string :city
        t.string :state
        t.integer :zip
        t.date :date
        t.time :start_time
        t.time :end_time
        t.string :description
        t.string :payment_type
        t.string :lat
        t.string :lng
        t.references :user, index: true
    end
  end
end
