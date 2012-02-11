class PressesController < ApplicationController
  def index
    @presses = Press.all

    respond_to do |format|
      format.html # index.html.erb
    end
  end
end
