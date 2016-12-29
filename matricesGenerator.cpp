#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>

#define SQRT2 1.414213562
#define zero 0.f
#define STEPS 10
#define PI_DIV_180 0.01745329252

class Point {
 
public:
    Point(){
        x = 0;
        y = 0;
    }
   
    Point(float ics, float igrega){
        x = ics, y = igrega;
    }
  
    Point(const Point& p){
        x = p.x;
        y = p.y;
    }
  
    ~Point(){}
  
    Point operator+(const Point &v) const {
        return Point(x+v.x, y+v.y);
    }

    Point operator-(const Point &v) const {
        return Point(x-v.x, y-v.y);
    }

    Point operator*(const Point &v) const {
        return Point(x*v.x, y*v.y);
    }

    Point operator/(const Point &v) const {
        return Point(x/v.x, y/v.y);
    }

    float x;
    float y;
};

typedef Point Vector;
typedef std::vector < std::vector < float > > Matrix;

float distance(Point& p, Point& q){
    float distancex = (q.x - p.x) * (q.x - p.x);
    float distancey = (q.y - p.y) * (q.y - p.y);
    return std::sqrt(distancex + distancey);
}

static std::vector < Point > points(8);
static std::vector < Point > matrixPoints(8);

void putValues(Matrix& originalMatrix, float ratioBetweenCircles, float ratioBetweenPoints, Matrix& matrix, float angle){
                        
            float value = 0;

            int zona = angle/45;
            
            for(int i = 0; i < points.size(); ++i){
                
                Point currentPoint = points[i];
                
                value = originalMatrix[currentPoint.x][currentPoint.y] * (1.f-ratioBetweenCircles) +
                        originalMatrix[currentPoint.x][currentPoint.y] * ratioBetweenCircles * SQRT2;
                
                Point destNear = points[(i+zona)%8];
                Point destFar = points[(i+zona+1)%8];
                
                matrix[destNear.x][destNear.y] += ratioBetweenPoints * value;
                matrix[destFar.x][destFar.y] += (1.f-ratioBetweenPoints) * value;
                
            }
            
}

int main(){
   
    std::cout << ":O)o>" << std::endl;
  
    Matrix originalMatrix(3,std::vector<float>(3,0.f));
    originalMatrix[0][0] =              1;
        originalMatrix[0][1] =              2;
            originalMatrix[0][2] =              1;
    originalMatrix[1][0] =              0;
        originalMatrix[1][1] =              0;
            originalMatrix[1][2] =              0;
    originalMatrix[2][0] =             -1;
        originalMatrix[2][1] =             -2;
            originalMatrix[2][2] =             -1;
  
    std::vector < Matrix > matrixes(360, Matrix(3,std::vector<float>(3,0.f)));
  
    //points in space
    points[0] = Point(1,2);// D
    points[1] = Point(0,2);// C
    points[2] = Point(0,1);// B
    points[3] = Point(0,0);// A
    points[4] = Point(1,0);// H
    points[5] = Point(2,0);// G
    points[6] = Point(2,1);// F
    points[7] = Point(2,2);// E
    
    //    ABC
    //    HOD
    //    GFE

    //  points in the matrix form angle 0 to angle 360 from 45 to 45    
    matrixPoints[0] = Point( 1, 1);// C
    matrixPoints[1] = Point( 0.f, 1);// B
    matrixPoints[2] = Point(-1, 1);// A
    matrixPoints[3] = Point(-1, 0.f);// H
    matrixPoints[4] = Point(-1,-1);// G
    matrixPoints[5] = Point( 0.f,-1);// F
    matrixPoints[6] = Point( 1,-1);// E
    matrixPoints[7] = Point( 1, 0.f);// D
    
    //Center
    Point O(zero,zero);    
    
//  Intersection in the Square    
    Point I;
   
    int angleEnGraus = 0;
    float ratioBetweenCircles, ratioBetweenPoints, value;
    for(int i = 0; i < 360; ++i){
       
        Matrix matrix(3,std::vector<float>(3,0.f));
        float angleEnRadiants = angleEnGraus * PI_DIV_180;

        //Punt al cercle petit de radi 1
        Point P(std::cos(angleEnRadiants)*1, std::sin(angleEnRadiants)*1);
        P.x = P.x+zero; P.y = P.y+zero;
        //Punt al cercle gran de radi SQRT2
        Point Q(std::cos(angleEnRadiants)*SQRT2, std::sin(angleEnRadiants)*SQRT2);            
        Q.x = Q.x+zero; Q.y = Q.y+zero;
        
        float circleDistance = distance(P,Q);
        float squareDistance = distance(matrixPoints[0], matrixPoints[7]);

        int matrixPoint = int(std::floor(angleEnGraus/45.f))%8;
        Point destinyPoint = matrixPoints[matrixPoint];
        
        switch (matrixPoint){
            //X fixed
            case 0:
            case 3:
            case 4:
            case 7:
                I.x = destinyPoint.x;
                I.y = (Q.y-P.y)*(I.x/(Q.x-P.x));                     
            break;
            //Y fixed
            case 1:
            case 2:
            case 5:
            case 6:
                I.y = destinyPoint.y;
                I.x = (Q.x-P.x)*(I.y/(Q.y-P.y));            
            break;
            default:
            break;
        }

        
        ratioBetweenPoints = distance(I,destinyPoint) / squareDistance;
  
        ratioBetweenCircles = distance(P,I) / circleDistance;
        putValues(originalMatrix, ratioBetweenCircles, ratioBetweenPoints, matrix, angleEnGraus);
      
        matrixes[i] = matrix;
        ++angleEnGraus;
      
    }
  
    for(int i = 0; i < 360; ++i){
      
       // if(i%45 == 0) {
            /*
    myMatrix(
         1.0,  2.0,  1.0, 
         0.0,  0.0,  0.0, 
         -1.0, -2.0,  -1.0  
    ),
    */
//            std::cout << "angle: " << i << " :" << std::endl;
if(i % STEPS == 0)
{
            std::cout << "myMatrix( " << std::endl;
            for(int a = 0; a < matrixes[i].size(); ++a){
                for(int b = 0; b < matrixes[i][a].size(); ++b){
                    float value = matrixes[i][a][b];
                    if(value < 0.001 && value > 0) value = 0.f;
                    if(value > -0.001 && value < 0) value = 0.f;
                    
                    if(value > std::floor(value) )std::cout << value;
                    else std::cout << value << ".0";
                    
                    if(a == matrixes[i].size() - 1 && b == matrixes[i][a].size()-1) 
                     std::cout << " ";
                    else std::cout << " , ";
                    
                }
                std::cout << std::endl;
            }
            std::cout << "), " << std::endl;
}       
//            std::cout << "------------------------------------" << std::endl;
        //}
    }
   
}
