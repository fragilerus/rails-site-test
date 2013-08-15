require 'net/http'
require 'uri'
class HttpController < ActionController::Base
  def get url
  	uri = URI(url)
	Net::HTTP.start(uri.host) do |http|
      resp = http.get(uri.path)
        render :text => proc{|response, output| output.write(resp.body)}
	end
  end
end
