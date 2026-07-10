from intersection_controller import IntersectionController

junction = IntersectionController()
for t in range(0, 71, 5):
    junction.tick(5)
    print(f"t={t}s  {junction.state()}")