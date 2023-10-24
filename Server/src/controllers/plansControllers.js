const { Plan, User } = require('../DB_config');

exports.getPlanById = async (id) => {
    try {
      const plan = await Plan.findByPk(id);
  
      if (!plan) {
        throw new Error('Plan not found');
      }
  
      return plan;
    } catch (error) {
      throw error;
    }
  };