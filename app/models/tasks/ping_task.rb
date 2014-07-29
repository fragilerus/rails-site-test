require 'net/http'
require 'uri'

class PingTask

	def initialize arguments
		@uri = URI("#{Rails.application.config.host_base_url}/ping")
		Rails.logger.info "Ping url: #{@uri.to_s}"
	end

	def call job, time
		response = Net::HTTP.get_response(@uri)
		Rails.logger.info "got response code '#{response.code}' from '#{@uri.to_s}'"
	end
	
end