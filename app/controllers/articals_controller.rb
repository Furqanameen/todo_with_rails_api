class ArticalsController < ApplicationController

  # before_action  only: [:show, :edit, :update, :destroy]

  # GET /articals
  # GET /articals.json
  def index
    @articals = Artical.where('title !=?',"")

    render json: @articals
  end

  # GET /articals/1
  # GET /articals/1.json
  def show
  end

  # GET /articals/new
  def new
    @artical = Artical.new
    render json: @articals
  end

  # GET /articals/1/edit
  def edit
  end

  # POST /articals
  # POST /articals.json
  def create
    # binding.pry
    @artical = Artical.new(title: params[:title],content: params[:content])
    @artical.save
    render json: @artical
  end

  # PATCH/PUT /articals/1
  # PATCH/PUT /articals/1.json
  def update
    # binding.pry
    @artical=Artical.find(params[:id])
    @artical.update_columns(enable: params[:enable])
    render json: @artical
    # respond_to do |format|
    #   if @artical.update(artical_params)
    #     format.html { redirect_to @artical, notice: 'Artical was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @artical }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @artical.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /articals/1
  # DELETE /articals/1.json
  def destroy
    # binding.pry
    @artical=Artical.find(params[:id])
    @artical.destroy
    render json: @artical
      # format.json { head :no_content }
    
  end

  private
    # binding.pry
    # Use callbacks to share common setup or constraints between actions.
    def set_artical
      @artical = Artical.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artical_params
      params.require(:artical).permit(:title, :content)
    end
end
