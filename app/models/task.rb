class Task < ActiveRecord::Base
  attr_accessible :arguments, :runner, :schedule
end
