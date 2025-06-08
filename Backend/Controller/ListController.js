const listmodel = require('../Model/ListModel')


exports.addinglist = async(req, res) => {

    const {list} = req.body
    const userId = req.user?.id || req.body.userId;

    const newList = new listmodel({ userId, list });

    if(!newList){
        return res.status(400).json({message: "error creating list"})
    }
    await newList.save();

    res.status(201).json({ message: "List created", list: newList });    
}

// exports.getalllists = async(req, res) => {

//     const lists = await listmodel.find()

//     if(!lists){
//         return res.status(400).json({message: "error getting list"})
//     }
//     return res.status(200).json({message: "here are all lists", list: lists})
// }

exports.getalllists = async (req, res) => {
    const userId = req.user?.id || req.body.userId; // Get the authenticated user's ID

    console.log(`>>>userid>>>`, userId)
  
    try {
      const lists = await listmodel.find({ userId }); // ✅ Only fetch lists for this user
  
      return res.status(200).json({
        message: "Here are your lists",
        list: lists
      });
    } catch (error) {
      return res.status(500).json({ message: "Error getting lists", error });
    }
  };
  

exports.deletelist = async(req, res) => {

    const {id} = req.params

    const deletelist = await listmodel.findByIdAndDelete(id)

    if(!deletelist){
        return res.status(404).json({ message: "List not found" });
    }
        return res.status(200).json({ message: "List deleted successfully", id });

}

exports.getall = async(req, res) => {
    
    const listdata = await listmodel.find()
        .populate('userId')

        if (listdata.length === 0) {
            return res.status(404).json({ message: 'No list found' });
        }

        return res.status(200).json({
            status: true,
            message: 'listss fetched successfully',
            data: listdata
        });
}