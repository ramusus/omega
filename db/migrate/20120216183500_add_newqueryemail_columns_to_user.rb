class AddNewqueryemailColumnsToUser < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.boolean :new_query_email
    end
  end

  def self.down
    drop :users, :new_query_email
  end
end