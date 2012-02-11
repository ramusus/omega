# -*- coding: utf-8 -*-
class Query < ActiveRecord::Base

  TOPIC_OPTIONS = [['Проведение тестирования', 0], ['Другая тема', 1]]

  validates :email, :presence => true, :email_format => {:message => 'Вы указали неправильный email'}
  validates :name, :presence => true, :length => { :maximum => 100 }
  validates :description, :presence => true
  validates :phone, :presence => true

  def topic_enum
    TOPIC_OPTIONS
  end

end