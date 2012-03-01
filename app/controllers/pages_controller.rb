class PagesController < ApplicationController
  def show
    @page = Page.find_by_slug(params[:slug] || '') || not_found
    @presses = Press.limit(4)
    @en = (@page.slug == 'english')

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

end