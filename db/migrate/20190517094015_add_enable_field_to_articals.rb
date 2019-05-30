class AddEnableFieldToArticals < ActiveRecord::Migration[5.2]
  def change
  	add_column :articals, :enable, :boolean,:default => false
  end
end
