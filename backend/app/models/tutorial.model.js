module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      published: { type: Boolean, default: false }
    },
    { timestamps: true }
  );

  // Add indexes for better query performance
  schema.index({ title: 1 });
  schema.index({ published: 1 });
  schema.index({ createdAt: -1 });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
