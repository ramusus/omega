class Press < ActiveRecord::Base
  has_attached_file :image
  attr_accessor :image_delete
  default_scope :order => "date DESC"

  before_validation { self.image.clear if self.image_delete == '1' }
end