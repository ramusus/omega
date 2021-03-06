class QueriesController < ApplicationController
  # GET /queries/new
  # GET /queries/new.json
  def new
    @query = Query.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @query }
    end
  end

  # POST /queries
  # POST /queries.json
  def create
    @query = Query.new(params[:query])

    respond_to do |format|
      if @query.save
        for user in User.find(:all, :conditions => ["new_query_email = true"])
          UserMailer.new_query_email(user, @query).deliver
        end
        format.json { render json: @query, status: :created, location: @query }
      else
        format.json { render json: @query.errors, status: :unprocessable_entity }
      end
    end
  end
end