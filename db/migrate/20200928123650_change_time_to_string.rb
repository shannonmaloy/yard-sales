class ChangeTimeToString < ActiveRecord::Migration[6.0]
  def change
    change_column :sales, :start_time, :string
    change_column :sales, :end_time, :string
  end
end
