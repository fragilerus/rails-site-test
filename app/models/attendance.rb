class Attendance < ActiveRecord::Base
  attr_accessible :payment, :session, :user
end
