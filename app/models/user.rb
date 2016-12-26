class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :plan

  attr_accessor :stripe_card_token #attribute whitelisting
  # If Pro user passes validations (emai, password, etc.),
  # then call Stripe and tell Stripe to set up a subscription
  # upon charging the customer's card.
  # Stripe responds back with customer data.
  # Store customer.id as the customer token (which we can later use to refund or upgrade user)
  # and we save the user.
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      self.stripe_customer_token = customer.id;
      save!
    end
  end
end
