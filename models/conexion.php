<?php 

Class Conexion{
    protected $con1,$con2,$host,$db1,$db2,$usu,$pass,$memoria;
    
    public function Conexion()
    {
        $this->host="localhost";
        $this->db1="horariosfim";
        $this->db2="oeraae2018";
        $this->usu="root";
        $this->pass="";
    }

    protected function Conectar($num)
    {
        
        if ($num == 1) {
            try {
                
                $this->con1 = new PDO("mysql:host=$this->host;dbname=$this->db1", $this->usu, $this->pass);
                $this->con1->exec("SET CHARACTER SET UTF8");
            }
            catch (Exception $e) {
                
                echo "Error" . $e->getMessage();
            }
            
        } else if ($num == 2) {
            
            try {
                
                $this->con2 = new PDO("mysql:host=$this->host;dbname=$this->db2", $this->usu, $this->pass);
                $this->con2->exec("SET CHARACTER SET UTF8");
            }
            catch (Exception $e) {
                
                echo "Error" . $e->getMessage();
            }
        } else {
            echo "error";
        }
        
    }

    public function Open($num)
    {
        $this->Conectar($num);
    }
    
    public function Close($num)
    {
        
        $this->memoria->closeCursor();
        $this->memoria = null;
        
        if ($num == 1) {
            $this->con1 = null;
            
        } else if ($num == 2) {
            $this->con2 = null;
            
        } else {
            
        }
        
    }

}
    
 ?>