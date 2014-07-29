class PingController < ApplicationController
  def index
  	logger.info "was pinged at #{Time.now}"
  	render :nothing => true
  end
end
