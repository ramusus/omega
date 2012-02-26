class PressesController < ApplicationController
  def index
    @presses = Press.all

    respond_to do |format|
      format.html # index.html.erb
    end
  end
  def show
    @page = Press.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end
end
