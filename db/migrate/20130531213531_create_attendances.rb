class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.session :session
      t.user :user
      t.string :payment

      t.timestamps
    end
  end
end
