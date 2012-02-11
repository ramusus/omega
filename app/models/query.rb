# -*- coding: utf-8 -*-
class Query < ActiveRecord::Base

  TOPIC_OPTIONS = [['Проведение тестирования', 0], ['Устройства полиграфы', 1], ['Обучающие курсы', 2], ['Иное', 3]]

  validates :email, :presence => true, :email_format => {:message => 'Вы указали неправильный email'}
  validates :name, :presence => true, :length => { :maximum => 100 }
  validates :description, :presence => true
  validates :phone, :presence => true

  def topic_enum
    TOPIC_OPTIONS
  end

end